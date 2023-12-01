<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { FilterMatchMode } from 'primevue/api'
import { ProductService } from '@/service/ProductService'

const columns = [
  { field: 'code', header: 'Code', sortable: true },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity', sortable: true }
]

const props = defineProps({
  displaySearch: {
    default: true,
    type: Boolean
  }
})

const handleRefresh = () => {
  ProductService.getProductsMini().then((data) => (products.value = data))
}

onMounted(() => {
  handleRefresh()
})

const products = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :globalFilterFields="['code', 'name', 'category', 'quantity']"
    resizableColumns
    scrollable
    sortMode="multiple"
    removableSort
    :value="products"
    stripedRows
    stateStorage="local"
    stateKey="datatable-state"
  >
    <template #header>
      <div class="datatable__header">
        <span>Products</span>
        <InputText
          v-if="displaySearch"
          v-model="filters['global'].value"
          placeholder="Keyword Search"
        />
        <Button @click="handleRefresh">Refresh</Button>
      </div>
    </template>
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :sortable="col.sortable"
    ></Column>
  </DataTable>
</template>

<style lang="scss" scoped>
.datatable__header {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  span {
    font-weight: 900;
  }
}
</style>
