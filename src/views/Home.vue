<template lang="pug">
  div
    div(class="header")
      div(class="header__title") Белый Денис Леонидович
      div(class="header__subtitle")
        v-icon(name="info") 
        span Запланирован отпуск с 12 марта по 1 апреля
    div(class="main")
      div(class="sidebar")
        div(class="sidebar-logo")
            img(:src="logoImg")
            div(class="sidebar-logo-edit" @click="openEditLogo")
              v-icon(name="edit")
        div(class="sidebar-info bg-gray")
          div 20 февраля
          div 25 дней отдыха
        div(class="sidebar-button")
          button(class="button") Мое развитие

      div(class="content")
        div(class="content__info bg-gray")
          div(class="content__info-item")
            div(class="text-left row")
              v-icon(name="account")
              span Директор департамента размещения рекламы телевизионного спонсорства и спецпроектов на федеральном и неэфирном ТВ в 
                a(href="#") Company name
            
            div(class="text-left row")
              v-icon(name="group")
              div
                a(href="#") Группа развития и интеграции внутренних решений
                div Руководитель 
                  a(href="#") Иван Иванов
          div(class="content__info-item text-right ais") Работает в Company name 
            span(class="bold") 8 месяцев, с 27.05.19
        
        div(class="content__contact")
          div(
            class="content__contact-item"
            v-for="(item, id) in contact"
          )
            v-icon(:name="item.icon" v-if="!item.edit")
            div(v-if="!item.edit")
              div 
                a(
                  v-if="item.link && !!item.value" 
                  :href="item.link"
                ) {{ item.value }}
                span(v-else-if="!!item.value") {{item.value}}
                span(v-else @click="editContact(id)" class="link") Заполнить
              div(v-if="item.subTitle" class="content__contact-item-subtitle") {{ item.subTitle }}
            div(
              v-if="!item.edit" 
              class="content__contact-item-edit"  
              @click="editContact(id)"
            )
              v-icon(name="edit")
            v-input(
              v-if="item.edit && !item.mask"
              :value="item.value"
              @input="inputText($event, id)"
              @click-check="clickCheck(id)"
              @click-close="clickClose(id)"
            )
            v-input(
              v-if="item.edit && item.mask"
              :value="item.value"
              v-mask="item.mask"
              @input="inputText($event, id)"
              @click-check="clickCheck(id)"
              @click-close="clickClose(id)"
            )
        div(class="content__additional")
          div(class="content__additional-item")
            div(class="content__additional-item-title") Интересы
              span(
                  v-if="!editInteress" 
                  class="content__additional-item-edit"  
                  @click="editInteress = true"
                )
                v-icon(name="edit")
            div(v-if="!editInteress")
              span(
                v-for="itemInteress in selectInterestsList" class="content__additional-item-span"
              ) {{ itemInteress }}
            v-select(
              v-if="editInteress" 
              :list-items="listInteress" 
              :value="selectInterestsList" 
              @click-close="editInteress = false" 
              @click-check="saveInteress"
            )
          div(class="content__additional-item")
            div(class="content__additional-item-title") Профессиональные навыки
              span(
                  v-if="!editSkill" 
                  class="content__additional-item-edit"  
                  @click="editSkill = true"
                )
                v-icon(name="edit")
            div(v-if="!editSkill")
              span(
                v-for="itemSkill in selectSkillList"
                class="content__additional-item-span"
              ) {{ itemSkill }}
            v-select(
              :list-items="listSkill" 
              v-if="editSkill"
              :value="selectSkillList" 
              @click-close="editSkill = false" 
              @click-check="saveSkill"
            )
    div(class="modal" v-if="showModal")
      v-icon(
        name="close-modal" 
        class="modal__close" 
        @click.native="showModal = false"
      )
      div(class="modal__title") Редактирование фото
      div(class="modal__form")
        label(class="modal__form-download" for="imgLoad")
          v-icon(name="download")
          span Загрузить новое фото
          input(
            type="file"
            id="imgLoad"
            accept="image/jpeg, image/gif, image/png"
            @change="onFileChange"
            style="display:none"
          )
        div(class="modal__form-cropper")
          cropper(
            ref="cropper"
            :src="imgCrop"
            :wheelResize="false"
          )
      div(class="modal__toolbar")
        button(class="button" @click="saveCropImg") Сохранить
        span(class="link" @click="showModal = false") Закрыть
</template>

<script>
import VIcon from "@/components/VIcon";
import VInput from "@/components/VInput";
import VSelect from "@/components/VSelect";
import listInteress from "@/list/listInteress";
import listSkill from "@/list/listSkill";
import { Cropper } from "vue-advanced-cropper";

export default {
  name: "Home",
  components: {
    VIcon,
    VInput,
    VSelect,
    Cropper
  },
  data() {
    return {
      contact: [
        {
          icon: "map-marker",
          value: "11 этаж, место 555",
          subTitle: "Башня империя",
          link: "#",
          edit: false
        },
        {
          icon: "email",
          value: "testemail@mail.ru",
          subTitle: null,
          link: "mailto:testemail@mail.ru",
          edit: false
        },
        {
          icon: "phone",
          value: "+7777",
          subTitle: null,
          link: "tel:+7777",
          edit: false
        },
        {
          icon: "skype",
          value: "skype",
          subTitle: null,
          link: "skype:skype",
          edit: false
        },
        {
          icon: "mobile",
          value: "+7 978 787-98-79",
          mask: "+# ### ###-##-##",
          subTitle: "Рабочий",
          link: null,
          edit: false
        },
        {
          icon: "teams",
          value: "Teams",
          subTitle: null,
          link: "#",
          edit: false
        },
        {
          icon: "mobile",
          value: null,
          mask: "+# ### ###-##-##",
          subTitle: null,
          link: null,
          edit: false
        }
      ],
      currentValue: "",
      logoImg: "https://www.fnu.edu/wp-content/uploads/2011/11/unknown-fnu.jpg",
      imgCrop: null,
      listInteress,
      listSkill,
      selectInterestsList: ["Пиво", "Рыбалка", "Компьютерные игры"],
      selectSkillList: ["js", "vue", "pug"],
      showModal: false,
      editSkill: false,
      editInteress: false
    };
  },
  methods: {
    inputText(value, id) {
      this.contact[id].value = value;
    },
    clickCheck(id) {
      this.contact[id].edit = false;
    },
    clickClose(id) {
      this.contact[id].edit = false;
      this.contact[id].value = this.currentValue;
    },
    editContact(id) {
      this.contact.forEach(el => {
        el.edit = false;
      });
      this.currentValue = this.contact[id].value;
      this.contact[id].edit = true;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      reader.onload = e => {
        this.imgCrop = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    openEditLogo() {
      this.showModal = true;
      this.imgCrop = this.logoImg;
    },
    saveCropImg() {
      const result = this.$refs.cropper.getResult();
      this.logoImg = result.canvas.toDataURL("image/jpeg");
      this.imgCrop = this.logoImg;
      this.showModal = false;
    },
    saveInteress(values) {
      this.selectInterestsList = values;
      this.editInteress = false;
    },
    saveSkill(values) {
      this.selectSkillList = values;
      this.editSkill = false;
    }
  }
};
</script>
<style lang="scss">
.icon {
  margin-right: 10px;
}
.header {
  margin: 30px auto 0px;
  text-align: center;
  .icon {
    margin-right: 10px;
  }
  &__title {
    margin-bottom: 10px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 34px;
    line-height: 46px;
    letter-spacing: 0.25px;

    /* Surface / grey darken-4 */

    color: #212121;
  }
  &__subtitle {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 20px;
    /* identical to box height, or 143% */

    letter-spacing: 0.25px;

    /* Surface / grey darken-1 */

    color: #757575;
  }
}
.main {
  padding: 20px 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1280px;
  margin: 0 auto;
  .sidebar {
    width: 164px;
    &-info {
      padding: 20px;
      margin: 25px 0;
    }
    &-logo {
      position: relative;
      height: 182px;
      img {
        width: 100%;
        height: 100%;
      }
      &-edit {
        display: none;
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 10px 14px;
        box-sizing: border-box;
        background: #2636ca;
        cursor: pointer;
        .icon {
          margin-right: 0;
          margin-left: 4px;
          fill: white;
          width: 17px;
          height: 17px;
        }
      }
      &:hover {
        .sidebar-logo-edit {
          display: block;
        }
      }
    }
  }
  .content {
    width: 1024px;
    &__info {
      padding: 20px;
      height: 182px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      &-item {
        width: 50%;
        & > div {
          margin-bottom: 20px;
        }
      }
    }
    &__contact {
      padding: 20px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      &-item {
        width: 50%;
        margin: 14px 0;
        min-height: 40px;
        display: flex;
        align-items: center;
        text-align: left;
        &-subtitle {
          font-size: 10px;
          line-height: 16px;
          letter-spacing: 0.4px;
          color: #757575;
        }
        &-edit {
          margin-left: 10px;
          padding: 10px;
          display: none;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          text-align: center;
          cursor: pointer;
          border-radius: 50%;
          .icon {
            margin-right: 0;
            width: 16px;
            height: 16px;
            fill: #071ac3;
          }
          &:hover {
            background: #e2e4f4;
          }
        }
        &:hover {
          .content__contact-item-edit {
            display: flex;
          }
        }
      }
    }
    &__additional {
      border-top: 1px solid #dbdbdb;
      padding-top: 25px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      text-align: left;
      &-item {
        width: 50%;
        &-title {
          font-size: 16px;
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          min-height: 38px;

          &:hover {
            .content__additional-item-edit {
              display: flex;
            }
          }
        }
        &-edit {
          display: none;
          margin-left: 15px;
          margin-left: 10px;
          padding: 10px;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          text-align: center;
          cursor: pointer;
          border-radius: 50%;
          .icon {
            margin-right: 0;
            width: 16px;
            height: 16px;
            fill: #071ac3;
          }
          &:hover {
            background: #e2e4f4;
          }
        }
        &-span {
          display: inline-block;
          margin-right: 4px;
          color: #071ac3;
        }
      }
    }
  }
}
.modal {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-shadow: 2px 0 2px 0 gray;
  background: #fff;
  padding: 20px 0;
  box-sizing: border-box;
  &__close {
    position: absolute;
    top: 20px;
    right: 20%;
    cursor: pointer;
  }
  &__title {
    font-size: 24px;
  }
  &__form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 35px 0;
    &-download {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 184px;
      height: 184px;
      box-shadow: 0 0 2px 0px gray;
      margin: 0px 10px;
      cursor: pointer;
    }
    &-cropper {
      width: 184px;
      height: 184px;
      margin: 0px 10px;
    }
  }
  &__toolbar {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    .button {
      width: 115px;
      margin-right: 10px;
    }
    .link {
      display: inline-block;
      padding: 10px;
    }
  }
}
</style>
