function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject(new Error("File reading error"));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export { convertImageToBase64 };
