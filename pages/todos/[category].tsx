import { useRouter } from "next/router";
import TodoListPage from "../todos";

const TodoListPageCategory = () => {
  const router = useRouter();
  const category = router.query.category as string;
  return (
    <TodoListPage filterDone={false} category={category} />
  );
};

export default TodoListPageCategory;
