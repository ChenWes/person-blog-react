import React, { Component } from 'react';
import { Button, Glyphicon, Media, Panel, ListGroup, ListGroupItem, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import '../css/bootstrap.min.css';
import '../css/bootstrap-theme.min.css';

import bg from '../img/bg.png'
import fetch from 'node-fetch';
import Pusher from 'pusher-js';

class Post extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            author: "",
            text: "",

            postList: [],
        };
    }

    componentWillMount() {
        this.pusher = new Pusher('235fe40f2b7ff3ad0a37', {
            cluster: 'ap1',
            encrypted: true
        });

        this.channel = this.pusher.subscribe('flash-posts');
    }

    componentDidMount() {
        var that = this;

        // this.channel.bind('new-post', function (data) {
        //     var postObject = {
        //         title: data.title,
        //         author: data.author,
        //         text: data.text,
        //     }

        //     that.state.postList.push(postObject);

        //     that.setState({
        //         postList: that.state.postList,
        //     });
        // });
        fetch('http://192.168.99.100:4001/post', {
            method: 'GET',
            mode: 'cors',
        })
            .then(function (res) {
                res.map((data, index) => {
                    var postdata = {
                        title: data.title,
                        author: data.author,
                        text: data.text
                    };                    

                    this.setState({
                        postList: postdata
                    });
                })
            })
            .then(function (data) {
                console.log(data.message);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    componentWillUnmount() {
        this.channel.unbind();
        this.pusher.unsubscribe(this.channel);
    }

    getClick() {
        // var that = this;
        fetch('http://192.168.99.100:4001/post', {
            method: 'GET',
            mode: 'cors',
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                console.log(data.message);
            })
            .catch(function (err) {
                console.log(err);
            });
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

        fetch('http://192.168.99.100:4001/post', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({ post: { title: this.state.title, author: this.state.author, text: this.state.text } }),
        })
            .then(function (res) {

                // var newpost = { title: this.state.title, author: this.state.author, text: this.state.text };
                // alert(newpost.title);
                // this.state.postList.push(newpost);
            })
            .then(function (data) {
                console.log(JSON.stringify(data));
            })
            .catch(function (err) {
                console.log(err);
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
                <br />
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
                </Form>

                <br />

                <Panel collapsible defaultExpanded header="posts">
                    <ListGroup fill>
                        {
                            this.state.postList.map((data, index) => {
                                return (
                                    <ListGroupItem key={index + 'listgroupitem'}>
                                        <Media key={index + 'media'}>
                                            <Media.Left align="top" key={index + 'medialeft'}>
                                                <img width={64} height={64} src={bg} alt="Image" key={index + 'img'} />
                                            </Media.Left>

                                            <Media.Body key={index + 'mediabody'}>
                                                <Media.Heading key={index + 'mediaheading'}>{data.title} --- {data.author}</Media.Heading>
                                                <p key={index + 'p'}>{data.text}</p>
                                            </Media.Body>
                                        </Media>
                                    </ListGroupItem>
                                );
                            })
                        }
                    </ListGroup>
                </Panel>
            </div>
        );
    }
};

export default Post;