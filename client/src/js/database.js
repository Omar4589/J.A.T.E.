import { openDB } from 'idb';

let db;

const initdb = async () => {
  db = await openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      }
    },
  });
};

// Add content to the database
export const putDb = async (content) => {
  if (!db) {
    console.error('Database has not been initialized.');
    return;
  }

  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.add(content);
  await tx.done;


  console.log('Content added to the jate database.');
};

// Get all content from the database
export const getDb = async () => {
  if (!db) {
    console.error('Database has not been initialized.');
    return;
  }

  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allContent = await store.getAll();

  console.log('All content retrieved from the jate database.', allContent);
  return allContent;
};

initdb();
