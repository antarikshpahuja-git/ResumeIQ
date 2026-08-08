import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export const parseResume = async (
  buffer: Buffer,
  mimetype: string
): Promise<{ text: string; pageCount: number; format: string }> => {
  let text = '';
  let pageCount = 1;
  let format = '';

  try {
    if (mimetype === 'application/pdf') {
      const data = await pdf(buffer);
      text = data.text;
      pageCount = data.numpages || 1;
      format = 'PDF';
    } else if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const data = await mammoth.extractRawText({ buffer });
      text = data.value;
      format = 'DOCX';
    } else if (mimetype === 'text/plain') {
      text = buffer.toString('utf-8');
      format = 'TXT';
    } else {
      throw new Error('Unsupported format');
    }

    if (!text || text.trim().length === 0) {
      throw new Error('Could not extract text from file');
    }

    return { text: text.trim(), pageCount, format };
  } catch (error) {
    console.error('Error parsing file:', error);
    throw new Error('Failed to parse file content. The file might be corrupted or protected.');
  }
};
