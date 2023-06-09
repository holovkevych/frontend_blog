import React from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {
  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)
  const { id } = useParams()

  React.useEffect(() => {
    axios
    .get(`/posts/${id}`)
    .then((res) => {
      setData(res.data)
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err)
      alert('Помилка при отриманні статті!')
    })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading}/>
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        //imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <p>
          {data.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Петренко",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Це тестовий коментар 555555",
          },
          {
            user: {
              fullName: "Іван Чумак",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
