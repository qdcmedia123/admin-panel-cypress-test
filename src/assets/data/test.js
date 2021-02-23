const renameKeys = (keysMap, obj) =>
 Object.entries(obj).forEach(item => {
 	Object.keys(item).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: item[key] }
    }),
    {}
  );

 })
  


keysMap = {
  name: 'firstName',
  job: 'passion'
};

obj = [{
  name: 'Bobo',
  job: 'Front-End Master'
}];


console.log(renameKeys(keysMap, obj));
// { firstName: 'Bobo', passion: 'Front-End Master' }