<template>
  <div class="descriptionRoles">
    <table role="table" aria-busy="false" aria-colcount="2" class="table b-table table-striped table-hover">
      <thead role="rowgroup" class="">
        <tr role="row" class="">
          <th role="columnheader" scope="col" aria-colindex="1" class="">
            <div>Nombre</div>
          </th>
          <th role="columnheader" scope="col" aria-colindex="2" class="">
            <div>Descripción</div>
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        <tr role="row" class="" v-for="role in roles" :key="role.id">
          <td aria-colindex="1" role="cell" class="">{{ role.name }}</td>
          <td aria-colindex="2" role="cell" class="">{{ role.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [
        { id: 1, name: 'Administrador', description: 'Encarga de ejecutar la asignación de turnos' },
        { id: 2, name: 'Experto', description: 'Ingenieros devops y programadores (quienes monitorean los servicios)' },
        { id: 3, name: 'Cliente', description: 'Quien genera el contrato' }
      ]
    }
  }
}
</script>

<style scoped>
  .descriptionRoles {
    margin: 20px 96px 20px 96px;
  }
</style>