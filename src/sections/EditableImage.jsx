import { useState } from "react";

import ImageEditModal from "./ImageEditModal";

const EditableImage = ({
  value,
  field,
  collection,
  document,
  title,
  isAdmin,
  className = "",
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSaved = (newValue) => {
    setCurrentValue(newValue);
  };

  return (
    <>
      <div className={`relative ${className}`}>

        {children
          ? children(currentValue)
          : (
            <img
              src={currentValue}
              alt={title || "Image"}
              className="h-full w-full object-cover"
            />
          )}

        {isAdmin && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="
              absolute
              right-3
              top-3
              z-50
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              text-sm
              shadow-md
              transition
              hover:scale-110
              hover:bg-gray-100
            "
            title={`Edit ${title || field}`}
          >
            ✏️
          </button>
        )}

      </div>


      <ImageEditModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        collection={collection}
        document={document}
        field={field}
        title={title || `Edit ${field}`}
        value={currentValue}
        onSaved={handleSaved}
      />

    </>
  );
};

export default EditableImage;