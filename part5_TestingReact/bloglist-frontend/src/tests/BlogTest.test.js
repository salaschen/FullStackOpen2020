import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Blog } from '../components/Blog'

let component ;
let data ;
let mockHandler;

beforeEach(() => {
    data = {
        author: 'salas',
        title: 'test blog',
        likes: 1, 
        url: 'url',
        user: '1234'
    }
    mockHandler = jest.fn() ;
    component = render(<Blog blog={data} handleLike={mockHandler} />) 
})


// 5.13
test('checks the blog renders the author and title, but no detail is displayed by default', () => {
   const descriptionDiv = component.container.querySelector('.BlogDescription')
    // console.log(descriptionDiv) ; // debug
    expect(descriptionDiv).not.toBe(null) ; 
    expect(descriptionDiv).toHaveTextContent(data.author);
    expect(descriptionDiv).toHaveTextContent(data.title);

    const detailDiv = component.container.querySelector('.BlogDetailDiv')
    expect(detailDiv).not.toBe(null) ; 
    expect(detailDiv).toHaveStyle('display: none') ;
}) ;

// 5.14*
test('url and like are shown once the button is click', () => {
    const viewButton = component.getByText('view') ;
    fireEvent.click(viewButton) ;
    const detailDiv = component.container.querySelector('.BlogDetailDiv')
    expect(detailDiv).not.toBe(null) ; 
    expect(detailDiv).not.toHaveStyle('display: none') ;
    expect(component.container.querySelector('.BlogLikes')).toHaveTextContent(`likes ${data.likes}`)
    expect(component.container.querySelector('.BlogUrl')).toHaveTextContent(`url: ${data.url}`)
});

// 5.15 *
test('click likes button twice', () => {
    const viewButton = component.getByText('view') ;
    fireEvent.click(viewButton) ;
    const likeButton = component.getByText('like') ;
    fireEvent.click(likeButton) ;
    fireEvent.click(likeButton) ;
    expect(mockHandler.mock.calls).toHaveLength(2) ;
}) ;

