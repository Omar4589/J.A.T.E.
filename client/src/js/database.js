import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Method that accepts some content and adds it to the database
export const putDb = async (content,id) => {
  const jateDb = await openDB("jate", 1);
  if (!jateDb) {
    console.error("Database has not been initialized.");
    return;
  }

  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  await store.put({id: id, value: content});
  await tx.done;

  console.log("Content added to the jate database.");
};


//Add logic for a method that gets all the content from the database
export const getDb = async () => {

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
