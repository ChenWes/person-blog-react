import React, { Component } from 'react';
import { Button, Glyphicon, Media, Panel, ListGroup, ListGroupItem, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import '../css/bootstrap.min.css';
import '../css/bootstrap-theme.min.css';
import bg from '../img/bg.png'
import fetch from 'node-fetch';
// import Pusher from 'pusher-js';

class Post extends Component {
    constructor() {
        super();

        this.state = {
            showEdit: false,

            id: "",
            title: "",
            author: "",
            text: "",

            postList: [],
        };
    }

    componentWillMount() {
        // this.pusher = new Pusher('235fe40f2b7ff3ad0a37', {
        //     cluster: 'ap1',
        //     encrypted: true
        // });

        // this.channel = this.pusher.subscribe('flash-comments');

        var that = this;

        fetch('http://192.168.99.100:4001/post', {
            method: 'GET',
            mode: 'cors',
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                var getpostList = that.state.postList.slice();
                data.map((data, index) => {
                    var postitem = { id: data._id, title: data.title, author: data.author, text: data.text };
                    getpostList.push(postitem);
                });
                console.log(getpostList);

                that.setState({
                    postList: getpostList
                });
            })
            .catch(function (err) {
                console.log(err);
                alert(err);
            });
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    postClick() {
        if (this.state.title === '') {
            alert('please enter title first');
            return;
        }
        else if (this.state.author === '') {
            alert('please enter author first');
            return;
        }
        else if (this.state.text === '') {
            alert('please enter text first');
            return;
        }

        var that = this;


        if (this.state.id) {
            //update data
            fetch('http://192.168.99.100:4001/post/' + this.state.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify({ post: { title: this.state.title, author: this.state.author, text: this.state.text } })
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function (returndata) {
                    var data = returndata[0];
                    var newdata = { id: data._id, title: data.title, author: data.author, text: data.text };
                    var postList = that.state.postList.slice();
                    postList.push(newdata);

                    that.setState({
                        showEdit: false,
                        id: '',
                        title: '',
                        author: '',
                        text: '',
                        postList: postList
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        else {
            //add data
            fetch('http://192.168.99.100:4001/post', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({ post: { title: this.state.title, author: this.state.author, text: this.state.text } })
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    var newdata = { id: data._id, title: data.title, author: data.author, text: data.text };
                    var postList = that.state.postList.slice();
                    postList.push(newdata);

                    that.setState({
                        showEdit: false,
                        id: '',
                        title: '',
                        author: '',
                        text: '',
                        postList: postList
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }

    updateClick(e) {
        e.preventDefault();
        var ediIndex = e.target.getAttribute('data-key');
        // 更新数据，并使用 onDel 更新到 TodoList 的 state 中，以便 React自动render
        var oper = this.state.postList[ediIndex];
        this.state.postList.splice(ediIndex, 1);
        this.setState({
            showEdit: true,
            id: oper.id,
            title: oper.title,
            author: oper.author,
            text: oper.text
        });
    }
    deleteClick(e) {
        e.preventDefault();
        var that = this;
        var ediIndex = e.target.getAttribute('data-key');
        var opeid = that.state.postList[ediIndex].id;

        fetch('http://192.168.99.100:4001/post/' + opeid, {
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // },
            method: 'DELETE',
            mode: 'cors'
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                if (data.message == 'success') {

                    that.state.postList.splice(ediIndex, 1);

                    that.setState({
                        showEdit: false,
                        id: '',
                        title: '',
                        author: '',
                        text: ''
                    });
                }
            })
            .catch(function (err) {
                that.setState({
                    showEdit: false,
                    id: '',
                    title: '',
                    author: '',
                    text: ''
                });
                alert(err);
            });
    }


    showeditClick(e) {
        this.setState({ showEdit: !this.state.showEdit });
    }
    cancelClick(e) {
        var postList = this.state.postList.slice();
        if (this.state.id) {
            var olddata = { id: this.state.id, title: this.state.title, author: this.state.author, text: this.state.text };
            postList.push(olddata);
        }

        this.setState({
            showEdit: false,
            id: '',
            title: '',
            author: '',
            text: '',
            postList: postList
        });
    }


    titleInputChange(e) {
        this.setState({ title: e.target.value });
    }
    authorInputChange(e) {
        this.setState({ author: e.target.value });
    }
    textInputChange(e) {
        this.setState({ text: e.target.value });
    }

    render() {
        return (
            <div>
                {this.state.showEdit ? (<div></div>) : (<Button onClick={this.showeditClick.bind(this)}>Add Post</Button>)}
                <br />
                {
                    this.state.showEdit ? (
                        <Form>
                            <FormGroup controlId="formPostTitle">
                                <ControlLabel>title</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="post title" value={this.state.title} onChange={this.titleInputChange.bind(this)} />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formPostAuthor">
                                <ControlLabel>author</ControlLabel>
                                {' '}
                                <FormControl type="text" placeholder="post author" value={this.state.author} onChange={this.authorInputChange.bind(this)} />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formPostContent">
                                <ControlLabel>text</ControlLabel>
                                {' '}
                                <textarea className="form-control" rows="8" placeholder="post text" value={this.state.text} onChange={this.textInputChange.bind(this)} />
                            </FormGroup>
                            {' '}
                            <Button onClick={this.postClick.bind(this)}>submit</Button>
                            <Button onClick={this.cancelClick.bind(this)}>cancel</Button>
                        </Form>

                    ) : (<div></div>)
                }
                <br />
                {
                    this.state.showEdit ? (<div></div>) :
                        (
                            <Panel collapsible defaultExpanded header="posts">
                                <ListGroup fill>
                                    {
                                        this.state.postList.map((data, index) => {
                                            return (
                                                <ListGroupItem key={index + 'listgroupitem'}>
                                                    <Media key={index + 'media'}>
                                                        <Media.Body key={index + 'mediabody'}>
                                                            <Media.Heading key={index + 'mediaheading'}>{data.title} --- {data.author}</Media.Heading>

                                                            <p key={index + 'p'}>{data.text}</p>
                                                            <p key={index + 'p'}>{data.created}</p>
                                                            <p key={index + 'p'}>{data.updated}</p>

                                                            <Button data-key={index} onClick={this.updateClick.bind(this)}>update</Button>
                                                            <Button data-key={index} onClick={this.deleteClick.bind(this)}>delete</Button>
                                                        </Media.Body>
                                                    </Media>
                                                </ListGroupItem>
                                            );
                                        })
                                    }
                                </ListGroup>
                            </Panel>
                        )
                }
            </div>
        );
    }
};

export default Post;