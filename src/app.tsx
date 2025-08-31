import { useEffect, type FC } from "react";
import { useDispatch } from "react-redux";
import { useSelector, type AppDispatch } from "./stores/store";
import { fetchTestData, pushTestData } from "./stores/slices/app-slice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";

export const App: FC = () => {
  //#region Redux初期処理
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state) => state.testData);

  useEffect(() => {
    if (data.length === 0) dispatch(fetchTestData());
  }, [dispatch, data.length]);
  //#endregion

  // 送信ボタンを押した際の挙動
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    dispatch(
      pushTestData({
        id: Number(formData.get("id")),
        name: formData.get("name")?.toString() ?? "",
      })
    );
    e.currentTarget.reset(); // フォームのリセット
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="p-8 rounded-2xl shadow-md bg-white space-y-4">
        <h1 className="text-3xl font-bold">Reduxデータ</h1>

        <form className="flex gap-4" onSubmit={handleSubmit}>
          <Input name="id" type="number" placeholder="ID" />
          <Input name="name" placeholder="Name" />
          <Button type="submit">
            <Plus />
          </Button>
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">ID</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((r) => (
              <TableRow key={String(r.id)}>
                <TableCell className="font-mono">{r.id}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center text-muted-foreground"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};
