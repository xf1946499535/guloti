<template>
  <div class="invitation" v-loading="loading">
    <el-dialog
      title="发布新帖"
      :visible.sync="dialogFormVisible"
      v-if="$store.getters.getme"
    >
      <el-form :model="newinvitationform" size="mini">
        <el-form-item label="新帖简述" :label-width="formLabelWidth">
          <el-input
            placeholder="请大概描述"
            v-model="newinvitationform.brief_context"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="具体内容" :label-width="formLabelWidth">
          <quill-editor
            v-model="newinvitationform.detail_context"
            ref="myQuillEditor"
            :options="editorOption"
            @focus="onEditorFocus($event)"
            @blur="onEditorBlur($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createinvitation"
          >确 认 发 布</el-button
        >
      </div>
    </el-dialog>
    <div class="invitation_title">
      <span>{{ $route.query.club_name }}车友会</span>
    </div>
    <div class="invitation_list">
      <div class="invitation_list_title">
        <div class="invitation_list_titleitem titleleft">大家都在聊...</div>
        <div class="invitation_list_titleitem">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="dialogFormVisible = true"
            >发布</el-button
          >
        </div>
      </div>
      <div
        class="invitationitem"
        v-for="(invitation, index) in invitations"
        :key="index + 'invitation'"
      >
        <div class="invitationitem_up">
          <div class="user_headimg">
            <img :src="invitation.headimg" alt="" />
          </div>
          <div class="user_name">{{ invitation.name }}</div>
        </div>
        <div class="invitationitem_down">{{ invitation.brief_context }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getinvitationlist, addinvitation } from "@/api/club";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      loading: false,
      invitations: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
          ],
        },
      },
      newinvitationform: {
        brief_context: "",
        detail_context: "",
      },
    };
  },
  methods: {
    init() {
      getinvitationlist(this.$route.query.club_id).then((res) => {
        this.invitations = res.data.data;
      });
    },
    createinvitation() {
      this.loading = true;
      let data = {
        brief_context: this.newinvitationform.brief_context,
        detail_context: this.newinvitationform.detail_context,
        club_id: this.$route.query.club_id,
      };
      addinvitation(data).then(
        (res) => {
          getinvitationlist(this.$route.query.club_id).then((res) => {
            this.invitations = res.data.data;
          });
          this.$message({
            message: "发布成功",
            type: "success",
          });
          this.loading = false;
          this.dialogFormVisible = false;
        },
        (err) => {
          this.$notify.error({
            title: "发布失败",
            message: err.message,
          });
          this.loading = false;
          this.dialogFormVisible = false;
        }
      );
    },
    // 准备富文本编辑器
    onEditorReady(editor) {},
    // 富文本编辑器 失去焦点事件
    onEditorBlur(editor) {},
    // 富文本编辑器 获得焦点事件
    onEditorFocus(editor) {},
    // 富文本编辑器 内容改变事件
    onEditorChange(editor) {},
  },
};
</script>

<style lang="scss">
.invitation {
  width: 100%;
  .invitation_title {
    padding: 0px 20px;
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    background-color: rgb(60, 60, 60);
    span {
      color: #fff;
      font-size: 1.5rem;
    }
  }
  .invitation_list {
    width: 100%;
    .invitation_list_title {
      height: 3rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .invitation_list_titleitem {
        height: 3rem;
        line-height: 3rem;
      }
      .titleleft {
        font-size: 2rem;
      }
    }
    .invitationitem {
      width: 100%;
      margin-top: 10px;
      padding: 0 10px;
      background-color: #fff;
      .invitationitem_up {
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        display: flex;
        .user_headimg {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .user_name {
          height: 3rem;
          margin-left: 10px;
          line-height: 3rem;
          font-size: 1.1rem;
        }
      }
      .invitationitem_down {
        height: 5rem;
        width: 100%;
        font-size: 1rem;
        line-height: 5rem;
        padding: 0 10px;
        cursor: pointer;
      }
    }
  }
}
</style>