import FolderUpload from "./FileUpload";


const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">
        React Playground
      </h1>
      <FolderUpload />
    </div>
  );
};

export default Home;