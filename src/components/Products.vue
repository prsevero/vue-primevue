<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { FilterMatchMode } from 'primevue/api'
import { ProductService } from '@/service/ProductService'

const columns = [
  { field: 'id', header: 'Code', sortable: true },
  { field: 'commercial_number', header: 'Reference number', sortable: true },
  { field: 'name', header: 'Category', sortable: true },
  { field: 'price', header: 'Price', sortable: true }
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
const expandedRows = ref([])
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const formatCurrency = (value) =>
  value.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
</script>

<template>
  <DataTable
    v-model:expandedRows="expandedRows"
    v-model:filters="filters"
    :globalFilterFields="['id', 'commercial_number', 'description', 'name', 'price']"
    :value="products"
    dataKey="id"
    removableSort
    resizableColumns
    scrollable
    sortMode="multiple"
    stateKey="datatable-state"
    stateStorage="local"
    stripedRows
  >
    <template #loading>Loading data, please wait...</template>
    <template #empty>No data found, try to reset your filters.</template>
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
    <Column expander style="max-width: 3rem !important" />
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :sortable="col.sortable"
    >
      <template #body="slotProps">
        <template v-if="col.field === 'price'">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
        <template v-else>
          {{ slotProps.data[col.field] }}
        </template>
      </template>
    </Column>
    <template #expansion="slotProps">
      {{ slotProps.data.description }}
    </template>
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

  input {
    @media (max-width: 549px) {
      flex-basis: 100%;
      margin-top: 15px;
      order: 1;
    }
  }
}
</style>
