<template>
  <v-card height="100vh">
    <v-card-title class="details">
      <div class="details-title">
        <div>
          <span class="headline">{{ card.title }}</span>
        </div>
        <div>
          <v-btn class="close" icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card-title>
    <v-card-subtitle class="details">
      <span>Criado por: {{ card.owner.name }}</span>
    </v-card-subtitle>
    <v-card-text class="details details-body">
      <div class="details-main">
        <Labels class="mb-2" :card="card" :label="label"></Labels>
        <div class="description">
          <div class="d-flex">
            <svg
              class="mr-2"
              style="width:24px;height:24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M4,5H20V7H4V5M4,9H20V11H4V9M4,13H20V15H4V13M4,17H14V19H4V17Z"
              />
            </svg>
            <h2 class="section-title">Descrição</h2>
          </div>
          <v-textarea
            v-model="description"
            label="Adicione uma descrição detalhada"
            solo
            hide-details
          ></v-textarea>
          <v-btn
            :disabled="enableSaveDescription"
            class="description-button"
            color="success"
            elevation="0"
            small
            @click="save"
            >Salvar</v-btn
          >
        </div>
      </div>
      <v-divider></v-divider>
      <div class="tabs">
        <v-tabs grow>
          <v-tab>
            <v-icon class="mx-2" small>mdi-paperclip</v-icon>
            Anexos
          </v-tab>
          <v-tab>
            <v-icon class="mx-2" small>mdi-comment-outline</v-icon>
            Comentários
          </v-tab>

          <v-tab-item>
            <div class="attachments">
              <Attachments :card="card"></Attachments>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div>
              <div class="d-flex align-center">
                <v-textarea
                  v-model="comment.text"
                  class="comment-input"
                  solo
                  dense
                  label="Escrever um comentário..."
                  hide-details
                  auto-grow
                  row-height="24"
                  rows="1"
                  @keyup.ctrl.enter.exact="createComment"
                ></v-textarea>
                <v-btn
                  class="ma-2 white--text"
                  color="blue-grey"
                  depressed
                  dark
                  @click="createComment"
                >
                  <span>Enviar</span>
                  <v-icon right small>mdi-send</v-icon>
                </v-btn>
              </div>

              <ul v-if="showComments" class="comments">
                <template v-for="(comment, index) in comments">
                  <li class="comment" :key="comment._id">
                    <div class="d-flex justify-space-between">
                      <div>
                        <span class="comment-user">{{
                          comment.user.name
                        }}</span>
                        <timeago
                          class="comment-time"
                          :datetime="comment.createdAt"
                        ></timeago>
                      </div>
                      <div class="comment-actions">
                        <v-btn color="error" x-small icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </div>
                    </div>
                    <span class="comment-text">{{ comment.text }}</span>
                  </li>
                  <v-divider
                    v-if="index + 1 < comments.length"
                    :key="index"
                  ></v-divider>
                </template>
              </ul>
            </div>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Labels from "../components/Labels";
import Attachments from "../components/Attachments";
import CardService from "../services/card.service";
import CommentService from "../services/comment.service";
export default {
  components: {
    Labels,
    Attachments
  },
  props: ["card"],
  data() {
    return {
      comments: [],
      comment: {},
      showActivities: false,
      showComments: true,
      tab: null,
      description: ""
    };
  },
  mounted() {
    this.loadComments();
    this.loadDescription();
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user.user;
      }
    },
    cardSelected: {
      get() {
        return this.$store.state.app.cardSelected;
      }
    },
    label: {
      get() {
        let labelTemp = {};
        this.$store.state.app.lists.map(list => {
          list.cards.map(c => {
            if (c._id === this.card._id) labelTemp = c.label;
          });
        });
        return labelTemp;
      }
    },
    enableSaveDescription() {
      if (this.card.description === undefined || this.card.description === "")
        return true;
      return false;
    }
  },
  watch: {
    card(newValue, oldValue) {
      console.log(newValue, oldValue);
    }
  },
  methods: {
    async save() {
      await CardService.updateDescription(this.card._id, this.description);
      this.$notification.showSuccess("Atualizado com sucesso!");
    },
    async loadDescription() {
      let { data } = await CardService.loadDescription(this.card._id);
      this.description = data.description;
    },
    async loadComments() {
      console.log(this.card);
      const { data } = await CommentService.findByCard(this.card._id);
      this.comments = data;
    },
    async createComment() {
      if (this.comment.text && this.comment.text !== "") {
        await CommentService.create(this.card, this.comment, this.user);
        this.comment = {};
        this.loadComments();
      }
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.details {
  background-color: #ebebeb;
}
.details .details-body {
  display: flex;
}
.details .details-body .details-main {
  flex: 1;
}

.details .details-body .details-actions {
  width: 160px;
  margin: 0 8px;
}
.details .details-title {
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.details .close {
  font-size: 18px;
  font-weight: bold;
}
.section-title {
  font-weight: 600;
  /* margin-bottom: 8px; */
}
.comment-input {
  margin: 8px 4px;
}
.labels {
  margin: 4px 4px 12px 4px;
}
.comments {
  margin: 0 8px;
  padding: 8px 4px;
  list-style: none;
  max-height: 300px;
  overflow: auto;
}
.comment {
  padding-bottom: -4px;
}
.comment-user {
  font-weight: 600;
  font-size: 12px;
}
.comment-time {
  margin-left: 4px;
  font-size: 12px;
}
.comment-text {
  display: block;
  font-size: 16px;
  margin: 0 4px;
  background-color: #ffffff;
  padding: 4px;
  border-radius: 4px;
}
.comment-actions {
  margin-left: 12px;
  width: 60px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.description-button {
  margin: 8px 0;
}
.tabs {
  padding: 12px;
}
</style>
