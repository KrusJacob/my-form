import { Helmet } from "react-helmet";
import { useUsersStore } from "../store/user";

const Home = () => {
  const user = useUsersStore((state) => state.user);

  return (
    <>
      <Helmet>
        <title>Home | My Form</title>
      </Helmet>
      <div className="mt-4">
        <h3 className="text-center text-7xl text-[var(--redColor)]">Welcome {user?.login}</h3>
      </div>
    </>
  );
};

export default Home;
