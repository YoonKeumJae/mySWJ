import ReactMarkdown from 'react-markdown';
import { getAssetUrl } from '../utils/assets';

const Markdown = ({children}) => {
    return (
        <ReactMarkdown
            components={{
            h1: (props) => <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-8" {...props} />,
            h2: (props) => <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6" {...props} />,
            h3: (props) => <h3 className="text-xl font-medium text-gray-800 mb-3 mt-4" {...props} />,
            p: (props) => <p className="text-gray-600 mb-4 leading-relaxed" {...props} />,
            img: (props) => {
                // 이미지 src가 상대 경로인 경우 getAssetUrl로 처리
                const src = props.src && props.src.startsWith('/') ? getAssetUrl(props.src) : props.src;
                return <img className="w-full h-auto my-6 rounded-lg shadow-md" {...props} src={src} />
            }
            }}
        >
            {children}
        </ReactMarkdown>
    );
};

export default Markdown;