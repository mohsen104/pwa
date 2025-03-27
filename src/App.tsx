import InstallPWAButton from "./InstallPwa";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src="https://a.storyblok.com/f/202591/2058x1267/04db8b5663/pwa.png"
        alt=""
        style={{ width: "100%", maxWidth: "300px" }}
      />
      <InstallPWAButton />
    </div>
  );
}

export default App;
