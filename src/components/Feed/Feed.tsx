import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import useAlert from "../../hooks/useAlert";
import { tAuthor } from "../../types/tAuthor";
import { tAuhtorFetched } from "../../types/tAuthorFetched";
import { tCategory } from "../../types/tCategory";
import { tImage } from "../../types/tImage";
import { tPost } from "../../types/tPost";
import { tPostFetched } from "../../types/tPostFetched";
import WordPressAPI from "../../utils/WordPressAPI";
import FeedCard from "./FeedCard";

const Feed = () => {
  const {alert, setAlert} = useAlert();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [posts, setPosts] = useState<tPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  const scrollTimeout = useRef<number | null>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);

  const fetchPosts = useCallback(async (page: number) => {
    const perPage = 12;
    const fields = ['id', 'title', 'date', 'author', 'categories', 'featured_media', 'link'].join(',');
    const orderBy = 'date';
    const order = 'desc';

    try {
      setIsFetching(true);
      const response = await WordPressAPI.get(`/posts?per_page=${perPage}&orderby=${orderBy}&order=${order}&_fields=${fields}&page=${page}`);
      if(response.data.length === 0) {
        setHasMorePosts(false);
        setIsFetching(false);
        return;
      }

      const authorIds: number[] = response.data.map((post: tPostFetched) => post.author);
      const categoryIds: number[] = response.data.flatMap((post: tPostFetched) => post.categories);
      const imageIds: number[] = response.data.map((post: tPostFetched) => post.featured_media);

      const [authors, categories, images]: [tAuthor[], tCategory[], tImage[]] = await Promise.all([
        fetchAuthors(authorIds),
        fetchCategories(categoryIds),
        fetchImages(imageIds),
      ]);

      const postsTranformed: tPost[] = response.data.map((post: tPostFetched) => ({
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
    const uniqueIds = Array.from(new Set(ids));

    const perPage = uniqueIds.length;
    const include = uniqueIds.join(',');
    const fields = ['id', 'name', 'link', 'avatar_urls'].join(',');
    
    const response = await WordPressAPI.get(`/users?per_page=${perPage}&include=${include}&_fields=${fields}`);
    return response.data.map((author: tAuhtorFetched) => ({
      id: author.id,
      name: author.name,
      url: author.link,
      avatar: author.avatar_urls[96] || author.avatar_urls[48] || author.avatar_urls[24] || null
    }));
  }

  const fetchCategories = async (ids: number[]) => {
    const uniqueIds = Array.from(new Set(ids));

    const perPage = uniqueIds.length;
    const include = uniqueIds.join(',');
    const fields = ['id', 'name'].join(',');

    const response = await WordPressAPI.get(`/categories?per_page=${perPage}&include=${include}&_fields=${fields}`);
    return response.data;
  }

  const fetchImages = async (ids: number[]) => {
    const uniqueIds = Array.from(new Set(ids));

    const perPage = uniqueIds.length;
    const include = uniqueIds.join(',');
    const fields = ['id', 'source_url', 'alt_text'].join(',');

    const response = await WordPressAPI.get(`/media?per_page=${perPage}&include=${include}&_fields=${fields}`);
    return response.data;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        if (
          scrollContainer.current &&
          scrollContainer.current.scrollTop + scrollContainer.current.clientHeight >= scrollContainer.current.scrollHeight - 2000 &&
          hasMorePosts &&
          !isFetching
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      }, 50);
    };

    const scrollableDiv = scrollContainer.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [hasMorePosts, isFetching]);

  useEffect(() => {
    fetchPosts(page);
  }, [fetchPosts, page]);

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