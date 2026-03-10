def process_document_task_delay(*args, **kwargs):
    pass
    
class MockTask:
    def delay(self, *args, **kwargs):
        pass
        
process_document_task = MockTask()
