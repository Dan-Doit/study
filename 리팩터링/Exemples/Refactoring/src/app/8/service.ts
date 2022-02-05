const renderPhoto = (photo) => {
  return [
    `<p>제목: ${photo.title}</p>`,
    `<p>위치 : ${photo.location}</p>`,
    `<p>날짜 : ${photo.date.toDateString()}</p>`,
  ].join('\n');
};

const renderPerson = (person) => {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  return result.join('\n');
};

const photoDiv = (photo) => {
  return ['<div>', renderPhoto(photo), '</div>'];
};

// 타입 정의
type Photo = {
  title: string;
  location: string;
  date: Date;
};

type EmitPhotoData = (photo: Photo) => string[];

const emitPhotoData: EmitPhotoData = (photo) => {
  const result = [];
  result.push(`<p>위치 : ${photo.location}</p>`);
  return result;
};
