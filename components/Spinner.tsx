import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center p-4" role="status">
      <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent" />
    </div>
  );
}
