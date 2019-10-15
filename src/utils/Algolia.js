// import algolia from 'algoliasearch';

// const { ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY } = process.env;
// const algoliaClient = algolia(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY);

// function addObjects(index, data) {
//   return new Promise((resolve, reject) => {
//     const indexObject = algoliaClient.initIndex(index);

//     indexObject.addObjects(data, (error, result) => {
//       error ? reject(error) : resolve(result);
//     });
//   });
// }

// function updateObjects(index, data) {
//   return new Promise((resolve, reject) => {
//     const indexObject = algoliaClient.initIndex(index);

//     indexObject.saveObjects(data, (error, result) => {
//       error ? reject(error) : resolve(result);
//     });
//   });
// }

// function updatePartialObjects(index, data) {
//   return new Promise((resolve, reject) => {
//     const indexObject = algoliaClient.initIndex(index);

//     indexObject.partialUpdateObjects(data, (error, result) => {
//       error ? reject(error) : resolve(result);
//     });
//   });
// }

// function deleteObjects(index, deletingId) {
//   return new Promise((resolve, reject) => {
//     const indexObject = algoliaClient.initIndex(index);

//     indexObject.deleteObjects(deletingId, (error, result) => {
//       error ? reject(error) : resolve(result);
//     });
//   });
// }

// function deleteObjectsByFilter(index, filterBy) {
//   return new Promise((resolve, reject) => {
//     const indexObject = algoliaClient.initIndex(index);

//     indexObject.deleteBy(filterBy, (error, result) => {
//       error ? reject(error) : resolve(result);
//     });
//   });
// }

// function getObjectsByIds(index, ids) {
//   return new Promise((resolve, reject) => {
//     const indexObject = algoliaClient.initIndex(index);

//     indexObject.getObjects(ids, (error, result) => {
//       error ? reject(error) : resolve(result);
//     });
//   });
// }

// function getObjectById(index, id) {
//   return new Promise((resolve, reject) => {
//     const indexObject = algoliaClient.initIndex(index);

//     indexObject.getObject(id, (error, result) => {
//       error ? reject(error) : resolve(result);
//     });
//   });
// }

// function operateBatch(index, action, data = {}) {
//   return new Promise((resolve, reject) => {
//     const batchObject = [{
//       action,
//       indexName: index,
//       body: data
//     }];

//     algoliaClient.batch(batchObject, (error, result) => {
//       error ? reject(error) : resolve(result);
//     });
//   });
// }

// export default {
//   addObjects,
//   updateObjects,
//   updatePartialObjects,
//   deleteObjects,
//   deleteObjectsByFilter,
//   getObjectsByIds,
//   getObjectById,
//   operateBatch,
// };
