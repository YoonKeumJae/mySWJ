import ReactMarkdown from 'react-markdown';

const Markdown = ({children}) => {
    return (
        <ReactMarkdown
            components={{
            h1: (props) => <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-8" {...props} />,
            h2: (props) => <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6" {...props} />,
            h3: (props) => <h3 className="text-xl font-medium text-gray-800 mb-3 mt-4" {...props} />,
            p: (props) => <p className="text-gray-600 mb-4 leading-relaxed" {...props} />,
            img: (props) => <img className="w-full h-auto my-6 rounded-lg shadow-md" {...props} />
            }}
        >
            {children}
        </ReactMarkdown>
    );
};

export default Markdown;