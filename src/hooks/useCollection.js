import { useState, useEffect } from 'react'
import {db} from '../firebase/config'

//firebase imports
import { collection, onSnapshot } from 'firebase/firestore'

export const useCollection = (c) => {
  const [documents, setDocuments] = useState(null)
  // const [isPending, setIsPending] = useState(false)
  // const [error, setError] = useState(false)

  useEffect(() => {
   // setIsPending(true)

    let ref = collection(db, c)

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setDocuments(results)
      // setIsPending(false)     
      }) 
   
      return () => unsub()

  }, [c])
  // [c] -> when c (collection) changes it reruns the function
 return{ documents }
}
