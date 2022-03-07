async function handleUpload() {
  var file = document.getElementById("file");
  console.log(file.files[0]);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer 5eeae49394cd929e299785c8805bd168fc675280"
  );

  var formdata = new FormData();
  formdata.append("image", file.files[0]);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  const res = await fetch("https://api.imgur.com/3/upload", requestOptions);
  const {data} = await res.json();
  console.log(data);
  let mainDiv = document.getElementById("image");
  let img = document.createElement("img");
  img.src = data.link;
  mainDiv.append(img);
}