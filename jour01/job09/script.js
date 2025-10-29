function tri(numbers, order) {
  if (order === "asc") {
    return numbers.sort((a, b) => a - b);
  } else if (order === "desc") {
    return numbers.sort((a, b) => b - a);
  } else {
    return "Ordre invalide";
  }
}
console.log(tri([5, 2, 9, 1], "asc")); 
console.log(tri([5, 2, 9, 1], "desc")); 
console.log(tri([5, 2, 9, 1], "xyz"));
