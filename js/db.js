async function saveForLater(player) {
  try {
    let db = await idb.open('arsenal',1, upgradeDB => upgradeDB.createObjectStore('players',{
      keyPath: 'idPlayer',
    }));
    
    let tx = db.transaction('players','readwrite');
    let store = tx.objectStore('players');

    await store.put(player);
    await tx.complete;
    db.close();
    console.log(`player ${player.strPlayer} berhasil disimpan`);
  } catch (error) {
    console.log('Jancuk');
  }
}

async function getAllData() {
  try {
    let db = await idb.open('arsenal',1,upgradeDB => upgradeDB.createObjectStore('players',{
      keyPath: 'idPlayer',
    }));
    
    let tx = db.transaction('players','readonly');
    let store = tx.objectStore('players');
    return store.getAll();
  } catch (error) {
    console.log(error.message)
  }
}

async function removeFromSaved(player) {
  try{
    let db = await idb.open('arsenal',1,upgradeDB => upgradeDB.createObjectStore('players',{
      keyPath: 'idPlayer',
    }));
    
    let tx = db.transaction('players','readwrite');
    let store = tx.objectStore('players');
    await store.delete(player.idPlayer);
    await tx.complete;
    db.close();
    document.querySelector(`.p-${player.idPlayer}`).parentElement.parentElement.parentElement.style.display='none';
  } catch {
    console.log(error.message)
  }
}