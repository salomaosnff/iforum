<script setup lang="ts">
const color = ref('primary');

function click() {
  console.log('Click');
}
</script>

<template>
  <select
    v-model="color"
    class="bg--background fg--foreground"
  >
    <option value="primary">
      Primária
    </option>
    <option value="secondary">
      secondary
    </option>
    <option value="panel">
      panel
    </option>
    <option value="forefround">
      forefround
    </option>
    <option value="danger">
      danger
    </option>
    <option value="warning">
      warning
    </option>
    <option value="info">
      info
    </option>
    <option value="success">
      success
    </option>
  </select>
  <table class="prose text-center">
    <thead>
      <tr>
        <th>
          Variante
        </th>
        <th>
          Padrão
        </th>
        <th>
          Arredondado
        </th>
        <th>
          Desativado
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          Padrão
        </td>
        <td>
          <UiBtn
            :color="color"
            @click="click"
          >
            Botão
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            rounded
          >
            Botão
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            disabled
            @click="click"
          >
            Botão
          </UiBtn>
        </td>
      </tr>
      <tr>
        <td>
          Outline
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="outline"
          >
            Botão
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            rounded
            variant="outline"
          >
            Botão
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="outline"
            disabled
          >
            Botão
          </UiBtn>
        </td>
      </tr>
      <tr>
        <td>
          Flat
        </td>

        <td>
          <UiBtn
            :color="color"
            variant="flat"
          >
            Botão
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            rounded
            variant="flat"
          >
            Botão
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="flat"
            disabled
          >
            Botão
          </UiBtn>
        </td>
      </tr>
    </tbody>
  </table>

  <table class="prose text-center">
    <thead>
      <tr>
        <th>
          Variante
        </th>
        <th>
          Padrão
        </th>
        <th>
          Arredondado
        </th>
        <th>
          Desativado
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          Padrão
        </td>
        <td>
          <UiBtn
            :color="color"
            icon
          >
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            icon
            rounded
          >
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            icon
            disabled
          >
            <UiIcon name="close" />
          </UiBtn>
        </td>
      </tr>
      <tr>
        <td>
          Outline
        </td>
        <td>
          <UiBtn
            :color="color"
            icon
            variant="outline"
          >
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            icon
            rounded
            variant="outline"
          >
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            icon
            variant="outline"
            disabled
          >
            <UiIcon name="close" />
          </UiBtn>
        </td>
      </tr>
      <tr>
        <td>
          Flat
        </td>

        <td>
          <UiBtn
            :color="color"
            icon
            variant="flat"
          >
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            icon
            rounded
            variant="flat"
          >
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            icon
            variant="flat"
            disabled
          >
            <UiIcon name="close" />
          </UiBtn>
        </td>
      </tr>
    </tbody>
  </table>

  <table class="prose text-center">
    <thead>
      <tr>
        <th>
          Variante
        </th>
        <th>
          Padrão
        </th>
        <th>
          Arredondado
        </th>
        <th>
          Desativado
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          Padrão
        </td>
        <td>
          <UiBtn
            :class="{
              'color__text--background': color === 'warning'
            }"
            :color="color"
          >
            <UiIcon name="close" />
            <span>Botão</span>
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :class="{
              'color__text--background': color === 'warning'
            }"
            :color="color"
            rounded
          >
            <UiIcon name="close" />
            <span>Botão</span>
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :class="{
              'color__text--background': color === 'warning'
            }"
            :color="color"
            disabled
          >
            <UiIcon name="close" />
            <span>Botão</span>
          </UiBtn>
        </td>
      </tr>
      <tr>
        <td>
          Outline
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="outline"
          >
            <UiIcon name="close" />
            <span>Botão</span>
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            rounded
            variant="outline"
          >
            <UiIcon name="close" />
            <span>Botão</span>
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="outline"
            disabled
          >
            <UiIcon name="close" />
            <span>Botão</span>
          </UiBtn>
        </td>
      </tr>
      <tr>
        <td>
          Flat
        </td>

        <td>
          <UiBtn
            :color="color"
            variant="flat"
          >
            <UiIcon name="close" />
            <span>Botão</span>
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            rounded
            variant="flat"
          >
            <UiIcon name="close" />
            <span>Botão</span>
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="flat"
            disabled
          >
            <UiIcon name="close" />
            <span>Botão</span>
          </UiBtn>
        </td>
      </tr>
    </tbody>
  </table>

  <table class="prose text-center">
    <thead>
      <tr>
        <th>
          Variante
        </th>
        <th>
          Padrão
        </th>
        <th>
          Arredondado
        </th>
        <th>
          Desativado
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          Padrão
        </td>
        <td>
          <UiBtn :color="color">
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            rounded
          >
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            disabled
          >
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
      </tr>
      <tr>
        <td>
          Outline
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="outline"
          >
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            rounded
            variant="outline"
          >
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="outline"
            disabled
          >
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
      </tr>
      <tr>
        <td>
          Flat
        </td>

        <td>
          <UiBtn
            :color="color"
            variant="flat"
          >
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            rounded
            variant="flat"
          >
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="flat"
            disabled
          >
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
      </tr>
    </tbody>
  </table>

  <table class="prose text-center">
    <thead>
      <tr>
        <th>
          Variante
        </th>
        <th>
          Padrão
        </th>
        <th>
          Arredondado
        </th>
        <th>
          Desativado
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          Padrão
        </td>
        <td>
          <UiBtn :color="color">
            <UiIcon name="close" />
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            rounded
          >
            <UiIcon name="close" />
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            disabled
          >
            <UiIcon name="close" />
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
      </tr>
      <tr>
        <td>
          Outline
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="outline"
          >
            <UiIcon name="close" />
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            rounded
            variant="outline"
          >
            <UiIcon name="close" />
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="outline"
            disabled
          >
            <UiIcon name="close" />
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
      </tr>
      <tr>
        <td>
          Flat
        </td>

        <td>
          <UiBtn
            :color="color"
            variant="flat"
          >
            <UiIcon name="close" />
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            rounded
            variant="flat"
          >
            <UiIcon name="close" />
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
        <td>
          <UiBtn
            :color="color"
            variant="flat"
            disabled
          >
            <UiIcon name="close" />
            <span>Botão</span>
            <UiIcon name="close" />
          </UiBtn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss"></style>
