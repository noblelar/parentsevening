// "use client";

// import { ProgressBar } from "react-loader-spinner";

// export default function Spinner() {
//   return (
//     <ProgressBar
//       height={"120"}
//       width={"120"}
//       ariaLabel="Common Loader"
//       borderColor="#000"
//       barColor="#fff"
//       wrapperStyle={{display : "block", margin : "auto" }}
      
//     />
//   );
// }



// components/Loader.tsx
import React from "react";
import { Oval } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Spinner;
