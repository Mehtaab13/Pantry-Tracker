'use client'
import Image from "next/image";
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {Box, Modal, Typography, Stack, TextField, Button} from '@mui/material'
import { collection, deleteDoc, doc, getDocs, query, setDoc, getDoc} from "firebase/firestore";

export default function Page() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      })
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) =>{
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }

  const removeItem = async (item) =>{
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      bgcolor="black">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
            <Box
              position="absolute"
              top="50%"
              left="50%"
              width={400}
              bgcolor="silver"
              border="2px solid silver"
              boxShadow={24}
              p={4}
              disply="flex"
              flexDirection="column"
              gap={3}
              sx={{
                transform: "translate(-50%,-50%)"
              }}
            >
              <Typography 
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="silver">
                  Add Item
              </Typography>
              <Stack width="100%" direction={"row"} spacing={2}>
                <TextField
                  id="outlined-basic"
                  label="Item"
                  variant='outlined'
                  fullWidth
                  value={itemName}
                  onChange={(e) => 
                    setItemName(e.target.value)
                  }/>
                  <Button 
                    variant="outlined"
                    onClick={() => {
                      addItem(itemName)
                      setItemName('')
                      handleClose()
                    }}
                  >
                    Add
                  </Button>
              </Stack>
            </Box>
        </Modal>
        <Button
          variant="contained"
          onClick={() => {
            handleOpen()
          }}
        >
          Add New Item
        </Button>
        <Box border="1px solid silver">
          <Box
            width="800px"
            height="100px"
            bgcolor="blue"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography 
              variant="h2"
              color="silver"
            >
              Inventory Items
            </Typography>
        </Box>
        <Stack 
          width="800px"
          height="300px"
          spacing={3}
          overflow="auto">
            {
              inventory.map(({name, quantity}) => (
                <Box
                  key={name}
                  width="100%"
                  minHeight="150px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  bgColor="silver"
                  pading={5}>
                    <Typography
                      variant="h3"
                      color="silver"
                      textAlign="center"
                      >
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Typography>
                      <Typography
                      variant="h3"
                      color="silver"
                      textAlign="center"
                      >
                       {quantity}
                      </Typography>
                      <Stack direction="row" spacing={2}>
                      <Button variant="contained" onClick={() => {
                        removeItem(name)
                      }}>
                        Remove
                      </Button>
                      <Button variant="contained" onClick={() => {
                        addItem(name)
                      }}>
                        Add
                      </Button>
                      </Stack>
                  </Box>
              ))
            }
        </Stack>
      </Box>
    </Box>
  );
}