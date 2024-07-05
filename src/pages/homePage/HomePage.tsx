/* eslint-disable @typescript-eslint/no-explicit-any */
import Post from "../../components/Post";
import { useQuery } from "@tanstack/react-query";

const HomePage = (props: {
  queryClient: any;
}) => {
  const {queryClient} = props;

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "https://zexkx72ghe.execute-api.us-east-1.amazonaws.com/dev/v1/posts"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data.map(
        (post: {
          author: string;
          likes: number;
          image: string;
          id: string;
          sk: string;
          comments: string[];
        }) => (
          <Post
            name={post.author}
            likes={post.likes}
            image={post.image}
            id={post.sk}
            comments={post.comments}
            key={post.sk}
            queryClient={queryClient}
          />
        )
      )}
    </div>
  );
};

export default HomePage;
