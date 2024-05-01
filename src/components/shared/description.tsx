import "react-quill/dist/quill.snow.css";

type DescriptionProps = {
  value: string;
};

const Description = ({ value }: DescriptionProps) => {
  return (
    <>
      <div className="quill ql-snow ">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      </div>
    </>
  );
};

export default Description;