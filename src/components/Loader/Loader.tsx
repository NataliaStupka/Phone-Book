import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#6967d6", "#7880f0", "#5756b5", "#a48ad5", "#e0d7f3"]}
      />
    </div>
  );
};

export default Loader;
