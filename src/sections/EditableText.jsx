import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/config";
import EditTextModal from "./EditTextModal";

const EditableText = ({
  value,
  field,
  collection,
  document,
  title,
  isAdmin,
  multiline = false,
  className = "",
  children,

  // Untuk array
  arrayField = null,
  arrayIndex = null,
  arrayProperty = null,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const isArrayItem =
    arrayField !== null &&
    arrayIndex !== null &&
    arrayProperty !== null;

  const saveArrayValue = async (newValue) => {
    const docRef = doc(db, collection, document);

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
        throw new Error("Document tidak ditemukan.");
    }

    const data = snapshot.data();

    const array = [...(data[arrayField] || [])];

    if (array[arrayIndex] === undefined) {
        throw new Error("Item array tidak ditemukan.");
    }

    // Array berisi object
    if (
        typeof array[arrayIndex] === "object" &&
        array[arrayIndex] !== null
    ) {
        array[arrayIndex] = {
        ...array[arrayIndex],
        [arrayProperty]: newValue,
        };
    }

    // Array berisi string
    else {
        array[arrayIndex] = newValue;
    }

    await updateDoc(docRef, {
        [arrayField]: array,
    });
    };

  const handleSaved = (newValue) => {
    setCurrentValue(newValue);
  };

  return (
    <>
      <div className={`relative w-fit ${className}`}>

        {children
          ? children(currentValue)
          : currentValue}

        {isAdmin && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="absolute -right-9 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow-md transition hover:scale-110 hover:bg-gray-100"
            title={`Edit ${title || field}`}
          >
            ✏️
          </button>
        )}

      </div>

      <EditTextModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}

        collection={collection}
        document={document}
        field={field}

        title={title || `Edit ${field}`}
        value={currentValue}
        multiline={multiline}

        onSaved={handleSaved}

        saveValue={
          isArrayItem
            ? saveArrayValue
            : undefined
        }
      />
    </>
  );
};

export default EditableText;