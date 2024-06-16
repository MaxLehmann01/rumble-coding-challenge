import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import useAlert from "../../hooks/useAlert";
import { tAuthor } from "../../types/tAuthor";
import { tAuhtorOG } from "../../types/tAuthorOG";
import { tCategory } from "../../types/tCategory";
import { tImage } from "../../types/tImage";
import { tPost } from "../../types/tPost";
import { tPostOG } from "../../types/tPostOG";
import WordPressAPI from "../../utils/WordPressAPI";
import FeedCard from "./FeedCard";
import { tImageOG } from "../../types/tImageOG";

const Feed = () => {
  const {alert, setAlert} = useAlert();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [posts, setPosts] = useState<tPost[]>([]);
  const [postsPage, setPostsPage] = useState<number>(1);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  const scrollTimeout = useRef<number | null>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);

  const fetchPosts = useCallback(async (pageNumber: number) => {
    const reqConfig: AxiosRequestConfig = {
      params: {
        per_page: 12,
        orderby: 'date',
        order: 'desc',
        _fields: ['id', 'title', 'date', 'author', 'categories', 'featured_media', 'link'].join(','),
        page: pageNumber
      }
    }

    try {
      // Fetching-Zustand setzen, damit beim Scrollen keine weiteren Requests gemacht werden.
      setIsFetching(true);
      
      const response = await WordPressAPI.get(`/posts`, reqConfig);
      if(response.data.length === 0) {
        setHasMorePosts(false);
        setIsFetching(false);
        return;
      }

      // IDs der Autoren, Kategorien und Bilder extrahieren
      const authorIds: number[] = response.data.map((post: tPostOG) => post.author);
      const categoryIds: number[] = response.data.flatMap((post: tPostOG) => post.categories);
      const imageIds: number[] = response.data.map((post: tPostOG) => post.featured_media);

      // Autoren, Kategorien und Bilder von WordPress-API abrufen
      const [authors, categories, images]: [tAuthor[], tCategory[], tImage[]] = await Promise.all([
        fetchAuthors(authorIds),
        fetchCategories(categoryIds),
        fetchImages(imageIds),
      ]);

      // Posts in anderes Format transformieren
      const postsTranformed: tPost[] = response.data.map((post: tPostOG) => ({
        id: post.id,
        title: post.title.rendered,
        url: post.link,
        author: authors.find((author: tAuthor) => author.id === post.author),
        categories: post.categories.map((categoryId: number) => categories.find((category: tCategory) => category.id === categoryId)),
        image: images.find((image: tImage) => image.id === post.featured_media) || null,
        timestamp: post.date
      }));

      setPosts((prevPosts) => [...prevPosts, ...postsTranformed]);

      setIsLoading(false);
      setIsFetching(false);
    } catch (err) {
      setIsLoading(false);
      setIsFetching(false);

      setAlert({
        severity: 'error',
        children: 'Posts konnten nicht geladen werden.'
      })
    }
  }, [setAlert]);

  const fetchAuthors = async (ids: number[]) => {
    
    // Mehrfach auftretende IDs entfernen
    const uniqueIds = Array.from(new Set(ids));

    const reqConfig: AxiosRequestConfig = {
      params: {
        per_page: uniqueIds.length,
        _fields: ['id', 'name', 'link', 'avatar_urls'].join(','),
        include: uniqueIds.join(',')
      }
    }

    const response = await WordPressAPI.get(`/users`, reqConfig);
    return response.data.map((author: tAuhtorOG) => ({
      id: author.id,
      name: author.name,
      url: author.link,
      avatar: author.avatar_urls[96] || author.avatar_urls[48] || author.avatar_urls[24] || null
    }));
  }

  const fetchCategories = async (ids: number[]) => {

    // Mehrfach auftretende IDs entfernen
    const uniqueIds = Array.from(new Set(ids));

    const reqConfig: AxiosRequestConfig = {
      params: {
        per_page: uniqueIds.length,
        _fields: ['id', 'name'].join(','),
        include: uniqueIds.join(',')
      }
    }

    const response = await WordPressAPI.get(`/categories`, reqConfig);
    return response.data;
  }

  const fetchImages = async (ids: number[]): Promise<tImage[]> => {

    // Mehrfach auftretende IDs entfernen
    const uniqueIds = Array.from(new Set(ids));

    const reqConfig: AxiosRequestConfig = {
      params: {
        per_page: uniqueIds.length,
        _fields: ['id', 'media_details', 'alt_text'].join(','),
        include: uniqueIds.join(',')
      }
    }

    const response = await WordPressAPI.get(`/media`, reqConfig);
    return response.data.map((image: tImageOG) => ({
      id: image.id,
      thumbnail: image.media_details.sizes.thumbnail,
      full: image.media_details.sizes.full,
      alt_text: image.alt_text
    }));
  }

  useEffect(() => {
    const handleScroll = () => {
      // Timeout, damit nicht bei jedem Scroll-Event ein Request gemacht wird
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        
      // Wenn am Ende des Containers gescrollt wird und es noch mehr Posts gibt, dann weitere Posts laden
      scrollTimeout.current = setTimeout(() => {
        if (
          scrollContainer.current &&
          scrollContainer.current.scrollTop + scrollContainer.current.clientHeight >= scrollContainer.current.scrollHeight - 2000 &&
          hasMorePosts &&
          !isFetching
        ) {
          setPostsPage((prevPostPage) => prevPostPage + 1);
        }
      }, 50);
    };

    const scrollableDiv = scrollContainer.current;
    if (scrollableDiv) scrollableDiv.addEventListener('scroll', handleScroll);
      
    return () => {
      if (scrollableDiv) scrollableDiv.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [hasMorePosts, isFetching]);

  useEffect(() => {
    fetchPosts(postsPage);
  }, [fetchPosts, postsPage]);

  // Während des Ladens der ersten Posts
  if(isLoading && posts.length === 0) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <CircularProgress size={65} />
      </div>
    )
  }

  return (
    <div 
      className="h-full w-full flex flex-wrap gap-4 p-4 relative overflow-y-auto" 
      ref={scrollContainer}
    >
      { alert && (
        <Snackbar
          open={alert !== null}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => setAlert(null)}
          children={
            <Alert 
              severity={alert?.severity} 
              icon={alert?.icon} 
              children={alert?.children} 
            />
          }
        />
      )}
      {posts.map((post: tPost) => (
        <FeedCard
          key={post.id}
          post={post}
        />
      ))}
      {isFetching && (
        <div className="w-full flex justify-center items-center">
          <CircularProgress size={35} />
        </div>
      )}
    </div>
  )
  
}

export default Feed;