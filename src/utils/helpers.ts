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

function getPastYears(year: number) {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = 0; i <= year; i++) {
    years.push(currentYear - i);
  }

  return years;
}

export { convertImageToBase64, getPastYears };
