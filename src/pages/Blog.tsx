import useSWR from "swr";
import { TableBlog } from "../components/table/table";
import { IBlog } from "../components/table/type";

const BlogsPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(
    "${import.meta.env.VITE_SERVER}/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <TableBlog blogs={(data as IBlog[])?.sort((a, b) => a.id - b.id)} />
    </div>
  );
};

export default BlogsPage;
