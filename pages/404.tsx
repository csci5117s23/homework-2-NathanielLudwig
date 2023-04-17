import Link from "next/link";
import { Stack } from "react-bootstrap";


const Custom404 = () => {
  return (
    <Stack gap={2} className="col-md-5 mx-auto py-3 px-3">
      <h1>404 please return home</h1>
      <Link href="/todos">Back to the todo list</Link>
    </Stack>
  );
};

export default Custom404