for (let index = 0; index <= 100; index++) {
  if (index % 7 === 0 || String(index).slice(-1) === "7") {
    continue;
  }
  console.log(index);
}
