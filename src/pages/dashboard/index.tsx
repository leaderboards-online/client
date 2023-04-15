import { notifications } from "@mantine/notifications";
import { type AxiosError } from "axios";
import Button from "~/components/Button";
import { useCreateLeaderboard } from "~/hooks/Leaderboard";

const Dashboard = () => {
  const createLeaderboard = useCreateLeaderboard();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-8 bg-almostBlack text-center text-almostWhite`}
    >
      <Button
        onClick={() => {
          createLeaderboard
            .mutateAsync()
            .catch((e: AxiosError<{ message: string }>) => {
              notifications.show({
                message: e.response?.data.message,
                color: "red",
              });
            });
        }}
      >
        <div className="flex flex-col">
          <h3 className="text-lg">create a leaderboard</h3>
          <p className="text-gray-500">i told you only one click :)</p>
        </div>
      </Button>
    </main>
  );
};

export default Dashboard;
