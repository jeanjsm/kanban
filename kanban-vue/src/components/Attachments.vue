<template>
  <div>
    <v-list v-if="attachments.length > 0" dense>
      <v-list-item-group>
        <template v-for="(attachment, index) in attachments">
          <v-list-item :key="attachment._id" selectable>
            <v-list-item-content>
              <div class="d-flex justify-space-between">
                <span class="my-auto">{{ attachment.name }}</span>
                <div class="d-flex">
                  <v-btn :href="attachment.url" target="_blank" icon>
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-btn>
                  <v-btn icon color="error" @click="remove(attachment)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-divider
            v-if="index + 1 < attachments.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <div class="my-2">
      <div class="px-2 py-2">
        <label class="d-flex">
          <input
            type="file"
            id="file"
            ref="myFiles"
            class="custom-file-input"
            @change="fillFormData"
          />
          <v-btn
            class="ma-2 white--text"
            color="blue-grey"
            depressed
            dark
            :loading="loadingFile"
            @click="upload"
          >
            <span>Enviar</span>
            <v-icon right small>mdi-cloud-upload</v-icon>
          </v-btn>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import AttachmentService from "../services/attachment.service";
export default {
  props: {
    card: {}
  },
  data() {
    return {
      attachments: [],
      form: new FormData(),
      file: {},
      loadingFile: false
    };
  },
  mounted() {
    this.findByCard();
  },
  methods: {
    async findByCard() {
      const { data } = await AttachmentService.findByCard(this.card._id);
      this.attachments = data;
    },
    fillFormData() {
      this.form.append("file", this.$refs.myFiles.files[0]);
    },
    async upload() {
      this.loadingFile = true;
      try {
        await AttachmentService.upload(this.card._id, this.form);
      } catch (err) {
        this.$notification.showError(err);
      } finally {
        this.loadingFile = false;
        this.findByCard();
        const input = this.$refs.myFiles;
        input.type = "text";
        input.type = "file";
      }
    },
    async remove(attachment) {
      await AttachmentService.delete(attachment);
      this.$notification.showSuccess("Removido com sucesso!");
      this.findByCard();
    }
  }
};
</script>

<style scoped>
.custom-file-input {
  padding: 0;
  width: 100%;
  cursor: pointer;
}
</style>
