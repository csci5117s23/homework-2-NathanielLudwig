import { useRouter } from "next/router";
import TodoListPage from "../todos";

const DonePageCategory = () => {
  const router = useRouter();
  const category = router.query.category as string;
  return (
    <TodoListPage filterDone={true} category={category} />
  );
};

export default DonePageCategory;
