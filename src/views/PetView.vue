<template>
    <header>
        <h1 class="text-2xl font-bold">listagem pets</h1>
        <p>listagem dos pets cadastrados</p>
        <ul>
            <li>

            </li>
        </ul>
    </header>
   

</template>
<script setup>
import { onMounted } from 'vue';

onMounted (()=>{
    GetPets()
})
async function GetPets() {
    try{
       const resposta = fetch("http//localhost:3000/pets")
    } catch(error){
        return console.log(error)
    }
    
}


</script>