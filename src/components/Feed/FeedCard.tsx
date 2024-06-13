import { Public } from "@mui/icons-material";
import { Avatar, Paper, Typography } from "@mui/material";
import { tPost } from "../../types/tPost";
import TimestampConverter from "../../utils/TimestampConverter";

type tFeedCardProps = {
  post: tPost
}

const FeedCard = ({post}: tFeedCardProps) => {
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
          >
            <Avatar
              src={post.author.avatar || ''}
              alt={`Avatar of ${post.author.name}`}
            />
          </a>
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
        >
          <Public className="text-gray-400" />
        </a>
      </div>
      <Typography
        variant="h5"
        fontWeight={500}
        className="whitespace-nowrap max-md:whitespace-normal"
        children={post.title}
      />
      {post.image && (
        <img
          src={post.image.source_url}
          alt={post.image.alt_text}
          loading="lazy"
          className="h-auto w-full max-w-full object-cover rounded-md shadow-md"
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
}

export default FeedCard;