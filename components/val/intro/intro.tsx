import ReactMarkdown from 'react-markdown';

import { useI18n } from '@/hooks/useI18n';

import AudioWithTranscript from '@/components/val/audio/audio-with-transcript';

const firstParagraphClasses = {
    general: 'font-serif dark:text-amber-50 mb-4',
    firstLetter: 'first-letter:text-amber-900 first-letter:text-7xl first-letter:float-left first-letter:font-bold first-letter:mr-3 dark:first-letter:text-amber-200',
};

export default function Intro() {
    const { t } = useI18n();

    return (
        <div className="w-full bg-white dark:bg-slate-950 p-4 pt-12">
            <div className="mb-8">
                <AudioWithTranscript
                    title="Ezra tests some audio"
                    transcript={['Lorem ipsum dolor sit amet elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer malesuada nunc vel risus. Ut ornare lectus sit amet. Elit sed vulputate mi sit.', 'Tristique magna sit amet purus gravida quis blandit turpis. A diam sollicitudin tempor id eu nisl. Libero enim sed faucibus turpis in. Neque egestas congue quisque egestas diam in arcu. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Ut ornare lectus sit amet est placerat. Ultrices sagittis orci a scelerisque purus. Maecenas volutpat blandit aliquam etiam. Sit amet mauris commodo quis imperdiet massa tincidunt. Nulla at volutpat diam ut venenatis.', 'Pulvinar elementum integer enim neque volutpat ac tincidunt. Felis eget velit aliquet sagittis id consectetur. Diam donec adipiscing tristique risus nec feugiat in fermentum. Nullam vehicula ipsum a arcu cursus. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Aliquet bibendum enim facilisis gravida neque convallis. Nisi est sit amet facilisis magna etiam tempor. Malesuada fames ac turpis egestas integer eget. Condimentum lacinia quis vel eros donec. Phasellus faucibus scelerisque eleifend donec. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Facilisi morbi tempus iaculis urna id volutpat lacus. Lorem dolor sed viverra ipsum nunc. Urna nec tincidunt praesent semper feugiat nibh sed. Pharetra sit amet aliquam id diam maecenas ultricies mi. Bibendum at varius vel pharetra vel turpis nunc. Sed euismod nisi porta lorem mollis aliquam ut porttitor. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Tempor nec feugiat nisl pretium fusce id velit. Malesuada proin libero nunc consequat interdum varius. Justo nec ultrices dui sapien eget mi proin sed. Pharetra vel turpis nunc eget lorem dolor sed viverra. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Odio aenean sed adipiscing diam donec adipiscing tristique. Dignissim diam quis enim lobortis scelerisque. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Nisi scelerisque eu ultrices vitae auctor eu augue. Nam libero justo laoreet sit amet cursus sit amet dictum. _A diam sollicitudin tempor id._ Duis at tellus at urna condimentum mattis pellentesque id. Fames ac turpis egestas integer eget aliquet nibh praesent. In eu mi bibendum neque egestas.', 'Neque vitae tempus quam pellentesque nec nam aliquam sem. Nisl tincidunt eget nullam non nisi est sit amet facilisis. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in.']}
                    description="A test example for the audio component"
                    src="/audio/intro.m4a"
                />
            </div>


            <ReactMarkdown className={`${firstParagraphClasses.general} ${firstParagraphClasses.firstLetter}`}>
                {t('intro.paragraph_1')}
            </ReactMarkdown>
        </div>
    );
}
