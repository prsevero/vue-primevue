<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional
import { ProductService } from '@/service/ProductService'

const columns = [
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' }
]

const handleRefresh = () => {
  ProductService.getProductsMini().then((data) => (products.value = data))
}

onMounted(() => {
  handleRefresh()
})

const products = ref()
</script>

<template>
  <div class="card">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <template #header>
        <div class="datatable__header">
          <span>Products</span>
          <Button @click="handleRefresh">Refresh</Button>
        </div>
      </template>
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
    </DataTable>
  </div>
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
