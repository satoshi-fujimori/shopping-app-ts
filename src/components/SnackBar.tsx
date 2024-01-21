export default function SnackBar({ type }: { type: string }) {
  let msg: string;

  switch (type) {
    case "update":
      msg = "更新が完了しました";
      break;
    case "delete":
      msg = "削除が完了しました";
      break;
    default:
      msg = "";
  }
  return (
    <div className="fixed bottom-0 left-0  p-4 shadow-lg bg-white rounded-lg w-auto m-2">
      {msg && <p>{msg}</p>}
    </div>
  );
}
