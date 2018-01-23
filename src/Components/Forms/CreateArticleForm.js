import React from "react";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import { Segment, Form, Button, Header, Grid } from "semantic-ui-react";
import InlineError from "../Messages/InlineError";

class CreateArticleForm extends React.Component {
    state = {
        data: {
            title: ""
        },
        thumbnail: "",
        value: RichTextEditor.createEmptyValue(),
        imagePreviewUrl: "",
        loading: false,
        errors: {}
    };

    onChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    };

    onChangeVal = value => {
        this.setState({ value });
        if (this.props.onChangeVal) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChangeVal(value.toString("html"));
        }
    };

    getPhoto = e => {
        const reader = new FileReader();
        const image = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                thumbnail: image,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(image);
    };

    render() {
        const { data, loading, errors, value, imagePreviewUrl } = this.state;

        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (
                <img
                    style={{ width: "100%" }}
                    src={imagePreviewUrl}
                    alt="Uploaded"
                />
            );
        } else {
            imagePreview = (
                <div className="previewText">
                    Please select an Image for Preview
                </div>
            );
        }

        return (
            <div>
                <Header as="h2" attached="top">
                    Create New Article
                </Header>
                <Segment attached>
                    <Form
                        onSubmit={this.onSubmit}
                        loading={loading}
                        encType="multipart/form-data"
                    >
                        <Form.Field error={!!errors.title}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Input article title"
                                value={data.title}
                                onChange={this.onChange}
                            />
                            {errors.title && (
                                <InlineError text={errors.title} />
                            )}
                        </Form.Field>
                        {/* TODO: Add style for React-RTE */}
                        <Form.Field error={!!errors.content}>
                            <label htmlFor="content">Content</label>
                            <div id="content" style={{ margin: "0 0 1em" }}>
                                <RichTextEditor
                                    placeholder="Type your article"
                                    value={value}
                                    onChange={this.onChangeVal}
                                    editorStyle={{ heigh: "110px" }}
                                />
                            </div>
                            {errors.content && (
                                <InlineError text={errors.content} />
                            )}
                        </Form.Field>
                        <Grid>
                            <Grid.Column width={4}>
                                <div className="imgPreview">{imagePreview}</div>
                            </Grid.Column>
                            <Grid.Column width={12} verticalAlign="middle">
                                <Form.Field error={!!errors.thumbnail}>
                                    <label htmlFor="thumbnail">Thumbnail</label>
                                    <input
                                        type="file"
                                        id="thumbnail"
                                        name="thumbnail"
                                        placeholder="Choose your thumbnail"
                                        value={data.thumbnail}
                                        onChange={this.getPhoto}
                                    />
                                    {errors.thumbnail && (
                                        <InlineError text={errors.thumbnail} />
                                    )}
                                </Form.Field>
                            </Grid.Column>
                        </Grid>
                        <Button primary>Submit</Button>
                    </Form>
                </Segment>
            </div>
        );
    }
}

CreateArticleForm.defaultProps = {
    onChangeVal: () => {}
};

CreateArticleForm.propTypes = {
    onChangeVal: PropTypes.func
};

export default CreateArticleForm;
