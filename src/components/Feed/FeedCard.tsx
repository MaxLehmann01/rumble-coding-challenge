import { Public } from "@mui/icons-material";
import { Avatar, Paper, Typography } from "@mui/material";
import { memo } from "react";
import { tPost } from "../../types/tPost";
import TimestampConverter from "../../utils/TimestampConverter";
import LazyImage from "../Image/LazyImage";

type tFeedCardProps = {
  post: tPost
}

const FeedCard = memo(({post}: tFeedCardProps) => {
  return (
    <Paper
      elevation={3}
      className="h-fit md:w-min max-w-full flex flex-col gap-4 p-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <a 
            href={post.author.url}
            target="_blank"
            children={(
              <Avatar
                src={post.author.avatar || ''}
                alt={`Avatar of ${post.author.name}`}
              />
            )}
          />
          <div className="flex flex-col">
            <Typography 
              variant="body2"
              children={post.author.name}
            />
            <Typography
              variant="caption"
              children={TimestampConverter(post.timestamp, 'de-DE', true)}
            />
          </div>
        </div>
        <a 
          href={post.url}
          target="_blank"
          children={(
            <Public 
              className="text-gray-400" 
            />
          )}
        />
      </div>
      <Typography
        variant="h5"
        fontWeight={500}
        className="whitespace-nowrap max-md:whitespace-normal"
        children={post.title}
      />
      {post.image && (
        <LazyImage
          image={post.image}
        />
      )}
      <div>
        <Typography 
          variant="body2"
          color="gray"
        >
          <span className="font-medium">Kategorien: </span>
          {post.categories.map(category => category.name).join(', ')}
        </Typography>
      </div>
    </Paper>
  )
})

export default FeedCard;