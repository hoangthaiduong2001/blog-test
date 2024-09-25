import { FormEvent, useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

const BlogDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState<string>("");
  const [dataComment, setDataComment] = useState<string[]>([]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(`http://localhost:8000/blogs/${params.id}`, fetcher, {
    revalidateOnReconnect: true,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (comment === "") {
      toast.warning("Please check comment");
      return;
    }

    fetch(`http://localhost:8000/blogs/${params.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, comment: [...dataComment, comment] }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          mutate("http://localhost:8000/blogs");
          setComment("");
          setDataComment(res.comment);
        } else {
          toast.error("error");
        }
      });
  };
  useEffect(() => {
    setDataComment(data?.comment || []);
  }, [data]);

  return (
    <>
      <Button className="text-white m-4" onClick={() => navigate("/")}>
        Back to blogs
      </Button>
      <Card className="text-center mx-24 mb-10">
        <Card.Header className="font-semibold text-2xl">
          {data?.title}
        </Card.Header>
        <Card.Body className="text-left">
          <Card.Text>{data?.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted font-medium">
          {data?.author}
        </Card.Footer>
      </Card>
      <Card className="text-center mx-24">
        <div>
          <Form.Label>Comment</Form.Label>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div className="flex px-3 gap-2">
              <Form.Control
                type="text"
                placeholder="Write comment here!..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button className="text-white" onClick={handleSubmit}>
                Comment
              </Button>
            </div>
          </form>
        </div>
        <Card.Body className="text-left">
          <Card.Text>
            <div className="flex flex-col justify-center">
              {dataComment.map((comment, index) => (
                <p key={index}>{comment}</p>
              ))}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default BlogDetailPage;
